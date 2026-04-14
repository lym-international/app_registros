import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrls: ['./all-projects.component.scss'],
    providers: [],
    imports: [BreadcrumbComponent, MatTooltip, MatIcon, BoardComponent]
})
export class AllprojectsComponent {
  public title = 'Oh My Kanban!';

  @ViewChild(BoardComponent)
  boardComponent!: BoardComponent;
}
