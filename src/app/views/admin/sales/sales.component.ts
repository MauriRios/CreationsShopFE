import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, last, Subject, takeUntil } from 'rxjs';
import { Expenses } from 'src/app/models/expenses.model';
import { Sales } from 'src/app/models/sales.model';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject<void>();
  
    // balance 
    isIncrease!: boolean;
    isWrost!: boolean;
    salesOExpenses!: number;
    annualEarnings!: number;
    bestSaleMonth!: string;
    bestSaleAmount!: number;
    worstSaleMonth!: string;
    worstSaleAmount!: number;
    bestProfit: {month: string; profit: number;} = {month: '', profit: 0};
    //ventas
    salesArr: Sales[] = [];
    monthsSales: string[] = [];
    monthlySales: number[] = [];
    //gastos
    expensesArr: Expenses [] = [];
    monthsExpenses: string[] = [];
    monthlyExpenses: number [] = [];
  
  constructor( private balanceService : BalanceService )
  { 
    this.salesAndExpenseMonthlyBalance();
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('destroy balance')
  }

  salesAndExpenseMonthlyBalance(){
    forkJoin([this.balanceService.getSales(),
              this.balanceService.getExpenses()
    ]).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(([sales, expenses]) => {
      //fetch ventas
      this.salesArr = sales;  
      this.monthsSales = this.salesArr.map(data => data.month);
      this.monthlySales = this.salesArr.map(data => data.saleMonthlyBalance);
      //fetch gastos
      this.expensesArr = expenses; 
      this.monthsExpenses = this.expensesArr.map(data => data.month);
      this.monthlyExpenses = expenses.map(data => data.expenseMonthlyBalance);

      this.annualEarning();
      this.salesOverExpenses();
      this.sortMonth();
      this.bestProfit = this.balanceService.findBestProfitMonth(this.expensesArr, this.salesArr);
      //verificar si el % de ventas sobre gastos es positivo
      if(this.salesOExpenses > 0 ){
        this.isIncrease = true
        console.log(this.salesArr)
        console.log(this.expensesArr)
      }

    });
}


  sortMonth(){
    this.salesArr.sort((a, b) => b.saleMonthlyBalance - a.saleMonthlyBalance);

    this.bestSaleMonth = this.salesArr[0].month;
    this.bestSaleAmount = this.salesArr[0].saleMonthlyBalance;
    this.worstSaleMonth = this.salesArr[11].month;
    this.worstSaleAmount = this.salesArr[11].saleMonthlyBalance;

    if(this.bestSaleAmount > this.worstSaleAmount ){
      this.isWrost = false
    }
  }

  annualEarning(){   
    this.annualEarnings = this.balanceService.annualEarnings(this.monthlySales, this.monthlyExpenses);
  }

  salesOverExpenses(){
    this.salesOExpenses = this.balanceService.salesOverExpenses(this.monthlySales, this.monthlyExpenses) 
  }
}
