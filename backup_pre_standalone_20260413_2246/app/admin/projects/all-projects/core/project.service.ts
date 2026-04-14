import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectAdapter } from './project.model';
// import { PROJECTS } from "./project.data";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends UnsubscribeOnDestroyAdapter {
  private trash: Set<number> = new Set([]); // trashed projects' id; set is better for unique ids
  // private _projects: BehaviorSubject<object[]> = new BehaviorSubject([]);
  private _projects = new BehaviorSubject<object[]>([]);
  public readonly projects: Observable<object[]> =
    this._projects.asObservable();
  private readonly API_URL = 'assets/data/projects.json';

  constructor(private adapter: ProjectAdapter, private httpClient: HttpClient) {
    super();
    // this._projects.next(PROJECTS); // mock up backend with fake data (not Project objects yet!)
    this.getAllProjectss();
  }

  /** CRUD METHODS */
  getAllProjectss(): void {
    this.subs.sink = this.httpClient.get<Project[]>(this.API_URL).subscribe({
      next: (data) => {
        this._projects.next(data); // mock up backend with fake data (not Project objects yet!)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  private compareProjectGravity(a: Project, b: Project): number {
    // if at least one of compared project deadlines is not null, compare deadline dates
    // (further date comes first), else compare priority (larger priority comes first)
    if (a.deadline !== null || b.deadline !== null) {
      // simply compare dates without converting to numbers
      return -(a.deadline! > b.deadline!) || +(a.deadline! < b.deadline!);
    } else {
      return b.priority - a.priority;
    }
  }

  public getObjects(): Observable<Project[]> {
    return this.projects.pipe(
      map((data: any[]) =>
        data
          .filter(
            // do not return objects marked for delete
            (item: any) => !this.trash.has(item.id)
          )
          .map(
            // convert objects to Project instances
            (item: any) => this.adapter.adapt(item)
          )
          .sort(this.compareProjectGravity)
      )
    );
  }

  public getObjectById(id: number): Observable<Project> {
    return this.projects.pipe(
      map(
        (data: any) =>
          data
            .filter(
              // find object by id
              (item: any) => item.id === id
            )
            .map(
              // convert to Project instance
              (item: any) => this.adapter.adapt(item)
            )[0]
      )
    );
  }

  public createOject(project: any): void {
    project.id = this._projects.getValue().length + 1; // mock Project object with fake id (we have no backend)
    this._projects.next(this._projects.getValue().concat(project));
  }

  public updateObject(project: Project): void {
    const projects = this._projects.getValue();
    const projectIndex = projects.findIndex((t: any) => t.id === project.id);
    projects[projectIndex] = project;
    this._projects.next(projects);
  }

  public deleteObject(project: Project): void {
    this._projects.next(
      this._projects.getValue().filter((t: any) => t.id !== project.id)
    );
  }

  public detachObject(project: Project): void {
    // add project id to trash
    this.trash.add(project.id);
    // force emit change for projects observers
    return this._projects.next(this._projects.getValue());
  }

  public attachObject(project: Project): void {
    // remove project id from trash
    this.trash.delete(project.id);
    // force emit change for projects observers
    return this._projects.next(this._projects.getValue());
  }
}
