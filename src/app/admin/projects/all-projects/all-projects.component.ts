import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  providers: [],
})
export class AllprojectsComponent {
  public title = 'Oh My Kanban!';

  @ViewChild(BoardComponent)
  boardComponent!: BoardComponent;
}
