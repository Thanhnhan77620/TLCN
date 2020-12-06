import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ListQuestionService } from './list-question.service';
declare var window;



@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListQuestionComponent implements OnInit {

  constructor(private listquestionService: ListQuestionService) { }
  file="iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  filePath=""
  ngOnInit(): void {
    this.listquestionService.getBase64().then(data => {
       this.filePath=data.file_Audio;;
        console.log(this.filePath)
     })
    
  }
  change($event:Event){
    const file=($event.target as HTMLInputElement).files[0]; 
    console.log(file)
  }

}

