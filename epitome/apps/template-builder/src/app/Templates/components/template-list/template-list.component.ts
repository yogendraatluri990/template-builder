import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  NavigationExtras,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { icons, Material_Modules } from '@assortments';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxsModule } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Constants as _constant } from '../../constants';
import { TemplateFacade } from '../../facades';
import { TemplateState } from '../../store';
import { Template } from '../../types';
import {
  TemplateConvertionComponent,
  TemplateConvertionComponentModule,
} from '../template-convertion/template-convertion.component';
import {
  TemplateEditComponent,
  TemplateEditComponentModule,
} from '../template-edit/template-edit.component';

@UntilDestroy()
@Component({
  selector: 'tb-templates-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit, OnDestroy, AfterViewInit {
  // ----------------------------------------------------------------
  // @ViewChild
  // ----------------------------------------------------------------
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('appTable', { static: false }) table: MatTable<Template>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // ----------------------------------------------------------------
  // @Public Variables
  // ----------------------------------------------------------------
  public dataSource: MatTableDataSource<Template>;
  public displayColumns = [..._constant.displayColumns];
  public pageSizeOptions = [..._constant.pageSizeOptions];
  public get icons(): typeof icons {
    return icons;
  }
  public dataSourceLength = 0;
  public templateList$ = this._facade.templateList$.pipe(
    tap((response: Array<Template>) => {
      if (response) {
        this.dataSource = new MatTableDataSource<Template>(response);
        this.dataSourceLength = response.length;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 2000);
      }
    })
  );
  // ------------------------------------------------------------------
  // @Private Variables
  // ------------------------------------------------------------------

  /**
   * @param {TemplateFacade} _facade
   * @param {MatDialog} _matDialog
   * @param {Router} _router
   *
   */

  constructor(
    private _facade: TemplateFacade,
    private _matDialog: MatDialog,
    private _router: Router
  ) {}

  // ------------------------------------------------------------------
  // @LifeCycle Hooks
  // ------------------------------------------------------------------
  ngOnInit(): void {
    this._facade.getTemplateList();
  }
  ngOnDestroy(): void {
    this._matDialog.closeAll();
  }
  ngAfterViewInit(): void {}

  // -------------------------------------------------------------------
  // @Public Methods
  // -------------------------------------------------------------------
  public onEdit(row: Template) {
    this._facade.getTemplateInfo(row.ApplicationId.toString());
    const dialogRef = this._matDialog.open(TemplateEditComponent, {
      width: `${screen.availWidth}px`,
      height: 'auto',
      data: {
        relationshipFlag: row.RelationshipFlag,
        currentApplicationId: row.ApplicationId,
      },
      disableClose: true,
      position: {
        top: '1%',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        console.log(' I am close');
      });
  }

  public onDesign(row: Template) {
    const params: NavigationExtras = {
      queryParams: {
        appCode: row.AppCode.replace(/\s/g, ''),
        templateName: row.TemplateName.replace(/\s/g, ''),
        templateId: row.TemplateId,
        applicationId: row.ApplicationId,
        title: row.Title.replace(/[^A-Za-z]/g, '').toLowerCase(),
      },
    };
    this._facade.storeCurrentTemplate(row);
    this._router.navigate(['/dashboard/templates/template-design'], params);
  }

  public applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }
  public convertToTemplate() {
    const dialogRef = this._matDialog.open(TemplateConvertionComponent, {
      width: '400px',
      data: {},
      disableClose: true,
      position: {
        top: '10%',
      },
    });
  }
}

const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent,
  },
];
// ---------------------------------------------------------------------------------------------------
// @NgModule
// ---------------------------------------------------------------------------------------------------
@NgModule({
  declarations: [TemplateListComponent],
  imports: [
    CommonModule,
    ...Material_Modules,
    NgxsModule.forFeature([TemplateState]),
    RouterModule.forChild(routes),
    TemplateEditComponentModule,
    TemplateConvertionComponentModule,
  ],
  exports: [TemplateListComponent, RouterModule, TemplateEditComponentModule],
})
export class TemplateListComponentModule {}
