import { keyframes } from '@angular/animations';
import { Component } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'ngCalculator';
  input: string ='';
  result: string='';

  pressNumber(num: string) {
    if(num == "."){
      if(this.input !=""){
        const lastNumber = this.getLastOperand()
        console.log(lastNumber.lastIndexOf("."))

        if(lastNumber.lastIndexOf(".") >=0)
          return;
      }
    }

    if(num =="0"){
      if(this.input ==""){
        return;
      }
      const prevKey = this.input[this.input.length -1];
      if (prevKey === '/' || prevKey ==='*' || prevKey === '-' || prevKey ==='+'){
        return;
      }
    }
    this.input = this.input +num
    this.calcAnswer();
  }

  getLastOperand(){
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if( this.input.toString().lastIndexOf("-") > pos)
      pos = this.input.lastIndexOf("-")
    if( this.input.toString().lastIndexOf("*") > pos)
      pos = this.input.lastIndexOf("*")
    if( this.input.toString().lastIndexOf("/") > pos)
      pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos +1)
  }

  pressOperator(op: string) {
    const lastKey = this.input[this.input.length -1];
    if(lastKey === '*' || lastKey === '/' || lastKey === '+' || lastKey === '-'){
      return;
    }
    this.input = this.input +op
    this.calcAnswer();
  }

  clear() {
    if(this.input != "") {
      this.input =this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result ='';
    this.input ='';
  }

  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length -1];
    if(lastKey === '.') {
      formula = formula.substr(0, formula.length -1);
    }

    lastKey = formula[formula.length -1];
    if(lastKey === '/' ||lastKey === '*' || lastKey ==='+' || lastKey === '-') {
      formula = formula.substr(0, formula.length -1);
    }

    console.log("Formula " + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if(this.input =="0")
      this.input = "";
  }
}
