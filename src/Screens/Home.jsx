import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, isValid, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
import { message } from 'antd';
import { requestApi } from '@/components/Axios/Axios';
import { Calendar } from '@/components/ui/calendar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Home({reportopen ,ReportClose}){
  console.log(reportopen)
  const [products, setProducts] = useState([]);
  const [productssaledate,setProductsSaleDate] = useState([]);
  const [date, setDate] = useState(subDays(new Date(),10))
  const [profitOrLoss, setProfitOrLoss] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  async function getAllProductsDashBoard(){
    try{
        const response = await requestApi('/products/dashboard','GET')
        setProducts(response.data.data)
    }
    catch(error){
        console.log(error)
        message.error("Something went Wrong")
    }
  }


  async function getProductsSalesInSpecficDate(date){
    try{
        const response = await requestApi('/products/dashboard/'+date,'GET')
        const data = response.data.data
        setProductsSaleDate(data);
        let totalProfitOrLoss = 0;
        let totalProfitOrLossPercent = 0;
        let totalSalePrice = 0;
        data.forEach((i) => {
          totalProfitOrLoss += parseFloat(i.profit_amount);
          totalProfitOrLossPercent += parseFloat(i.profit_or_loss_percentage);
          totalSalePrice += parseFloat(i.total_sale_price);
        });
        if (totalProfitOrLossPercent >= 0) {
          setProfitOrLoss({ status:"Profit", amount: totalProfitOrLoss, percent:totalProfitOrLossPercent, sales:totalSalePrice });
        } else {
          setProfitOrLoss({ status:"Loss", amount: totalProfitOrLoss, percent:totalProfitOrLossPercent, sales:totalSalePrice});
        }

    }
    catch(error){
        console.log(error)
        message.error("Something went Wrong")
    }
  }
  useEffect(() => {
    getAllProductsDashBoard();
  }, []);

  useEffect(() => {
    getProductsSalesInSpecficDate(format(date,'yyyy-MM-dd'));
  }, [date]);

  const SalesPerfomanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true, 
          text: 'Product',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: 'black',
        },
        display:true,
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          font: {
              size: 16,
              weight:"bold",
            },
            color:"black"
        },
      },
    },
  };
  const salesPerformanceData = {
    labels: products.map((product) => product.sale_date),
    datasets: [
      {
        label: 'Average Cost Price',
        data: products.map((product) => product.average_product_price),
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
      {
        label: 'Average Sales Price',
        data: products.map((product) => product.average_sale_price),
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
      },
    ],
  };
  
  const salesPerformanceOnSelectDate = {
    labels: productssaledate.map((i) =>i.product_name),
    datasets: [
      {
        label: 'Total Sale Price',
        data: productssaledate.map((data) => parseFloat(data.total_sale_price)),
        backgroundColor: 'lightgreen',
        borderColor: 'lightgreen',
        borderWidth: 1,
      },
      
    ],
  };
  const salesPercentOnSelectDate = {
    labels: productssaledate.map((i) =>i.product_name),
    datasets: [
      {
        label: 'Quantity',
        data: productssaledate.map((data) => parseFloat(data.quantity)),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: "Profit or Loss",
        data: productssaledate.map((data) => Math.abs(data.profit_or_loss_percentage)),
        backgroundColor: productssaledate.map((data) =>
          data.profit ? 'green' : 'red'
        ),
        borderColor: productssaledate.map((data) =>
          data.profit ? 'green' : 'red'
        ),
        borderWidth: 1,
      },
      
    ],
  };

  const downloadPDF = () => {
    try{
          if(productssaledate.length===0){
              message.warning("No Sales Found")
              throw error;
          }
          else{
              const content = document.getElementById("sales-dashboard-content");
              html2canvas(content).then((canvas) => {
                canvas.getContext('2d', { willReadFrequently: true });
                const imgData = canvas.toDataURL("image/png");
                const doc = new jsPDF();
                doc.addImage(imgData, "PNG", 20, 20, 160 , 250);
                doc.save("sales_dashboard.pdf");
                canvas.remove();
                
              }).catch((error) => {
                console.error("Error while capturing content:", error);
            })
            ReportClose();
        }
      }catch(error){
          console.log(error)
      }
  };
  useEffect(()=>{
    if(reportopen){
      downloadPDF()
    }
  },[reportopen])
  return (
    <div className='flex flex-grow flex-col ml-6 mt-10 self-center ' id="sales-dashboard-content" >
      <div className='overflow-x-auto w-[100%]'>
      <h2 className='text-2xl font-semibold'>Sales Dashboard</h2>
      <div className=' flex flex-col w-[100%]'>
        <h3>Sales Performance{"  (LAST 20 DAYS)"}</h3>
        <div className=' h-[400px] w-[90%]'>
        <Bar data={salesPerformanceData} options={SalesPerfomanceChartOptions} />
        </div>
      </div>
      </div>
      <div className='flex flex-col w-full mt-4'>
        <div className='flex flex-row w-full justify-end '>
        <div className='flex justigy-center self-center font-semibold text-2xl mr-4'>Sales on Date:</div>
              <Popover  open={isOpen} onChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                      value = {date}
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      onClick={()=>setIsOpen(!isOpen)}
                    >
                      {date && isValid(date)? (
                        format(date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    
                    onSelect={(date) => {
                      if (isValid(date)) {
                        setDate(date);
                      }
                      setIsOpen(!isOpen)
                    }}
                    disabled={(date) =>
                      date > new Date() || date < subDays(new Date(),30)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
        </div>
          <div className='flex w-full uppercase self-center'>
            
          </div>
          <div className='mt-[50px] w-full'>
            {
              productssaledate.length===0 ?
              <div className=' font-semibold text-3xl flex flex-col w-full items-center'>
                    NO SALES FOUND
                </div> 
              :
          <div className='mt-[50px] flex flex- row justify-between w-full'>
            <div className='flex flex-col w-2/3'>
            <div className='h-[400px]'>
              <Bar data={salesPerformanceOnSelectDate} options={SalesPerfomanceChartOptions} />
            </div>
            <div className='h-[400px]'>
              <Bar data={salesPercentOnSelectDate} options={SalesPerfomanceChartOptions} />
            </div>
          </div>
            <div className='flex w-1/3 flex-row justify-center  ml-4 pt-8 uppercase font-semibold text-2xl'>
            <div className='mr-4 w-full'>
            <p>{profitOrLoss.status} percent</p>
            <p>{profitOrLoss.status} amount </p>
            <p>total Sales price </p>
              </div>
              <div>
              <p>{Math.round(profitOrLoss.percent)}%</p>
              <p>{(Math.round(profitOrLoss.amount)).toLocaleString()}</p>
              <p>{(Math.round(profitOrLoss.sales)).toLocaleString()}</p>
              </div>
              </div>
        </div>
        }
        </div>
          </div>
    </div>
  );
};
