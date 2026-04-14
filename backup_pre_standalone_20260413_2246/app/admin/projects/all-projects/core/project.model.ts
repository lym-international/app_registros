import { Injectable } from '@angular/core';
import { Adapter } from './adapters';

export enum ProjectStatus {
  NEWPROJECTS = 0,
  RUNNING = 1,
  ONHOLD = 2,
  FINISHED = 3,
}

export enum ProjectPriority {
  LOW = -1,
  MEDIUM = 0,
  HIGH = 1,
}
export enum ProjectType {
  WEB = 'Website',
  ANDROID = 'Android',
  IPHONE = 'IPhone',
  TESTING = 'Testing',
}

export class Project {
  constructor(
    public id: number,
    public name: string,
    public status: number = ProjectStatus.NEWPROJECTS,
    public description?: string,
    public deadline?: Date,
    public priority: number = ProjectPriority.MEDIUM,
    public open_task?: number,
    public type: string = ProjectType.WEB,
    public created?: Date,
    public team_leader?: string,
    public comments?: number,
    public bugs?: number,
    public progress?: number
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class ProjectAdapter implements Adapter<Project> {
  adapt(item: any): Project {
    const adapted = new Project(
      Number(item.id),
      item.name,
      item.status ? Number(item.status) : undefined,
      item.description,
      item.deadline ? new Date(item.deadline) : undefined,
      item.priority ? Number(item.priority) : undefined,
      item.open_task,
      item.type,
      item.created ? new Date(item.created) : undefined,
      item.team_leader,
      item.comments ? Number(item.comments) : undefined,
      item.bugs ? Number(item.bugs) : undefined,
      item.progress ? Number(item.progress) : undefined
    );
    return adapted;
  }
}
