import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateSubjectComponent } from '../create-subject/create-subject.component';
import { UnitDialogComponent} from '../../dialog/unit-dialog/unit-dialog.component';
import {SubjectService} from '../SubjectWebservice';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import {MemberComponent} from './member/member.component';
import {NotesComponent} from './notes/notes.component';
import {UnitComponent} from './unit/unit.component';
import {LessionComponent} from './unit/lession/lession.component';
import { LessionCreateComponent } from './unit/lession-create/lession-create.component';
import { LessionDetailComponent } from './unit/lession/lession-detail/lession-detail.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {LessionReplyDialogComponent} from '../../dialog/lession-reply-dialog/lession-reply-dialog.component';
import { UnitAssignmentComponent } from './unit-assignment/unit-assignment.component';
import { AssignmentQuestionComponent } from './assignment-question/assignment-question.component';
import { AssignmentDialogComponent } from '../../dialog/assignment-dialog/assignment-dialog.component';
import { AssignmentQuestionDialogComponent } from '../../dialog/assignment-question-dialog/assignment-question-dialog.component';
import { QuillModule } from 'ngx-quill';
import { QuestionAttachmentComponent} from '../subjectDetail/question-attachment/question-attachment.component';
const routes = [

    {
        path     : '',
        component:       SubjectDetailComponent
    }, {
        path     : 'Member',
        component: MemberComponent }, {
            path     : 'notes',
            component: NotesComponent }, {
                path     : 'Unit/lession',
                component: UnitComponent },
            {
                path: 'lession',
                component: LessionComponent
            }, {
                path: 'lession/create',
                component: LessionCreateComponent
            }, {
                path: 'lession/update',
                component: LessionCreateComponent
            },
        {
            path: 'lession/detail',
            component: LessionDetailComponent
        }, {
            path: 'lession/edit',
            component: LessionCreateComponent
        }, {
            path     : 'Unit/assignment',
            component: UnitAssignmentComponent }, {
                path     : 'Unit/assignment/question',
                component: AssignmentQuestionComponent
            }, {
                path     : 'Unit/assignment/question/attachment',
                component: QuestionAttachmentComponent
            }
        ];

@NgModule({
     declarations: [ LessionCreateComponent,QuestionAttachmentComponent,
        LessionComponent, MemberComponent, SubjectDetailComponent,
        NotesComponent, UnitComponent, LessionDetailComponent, LessionReplyDialogComponent, UnitAssignmentComponent
        , AssignmentQuestionComponent, AssignmentDialogComponent, AssignmentQuestionDialogComponent

       ],
    imports     : [
        SharedModule ,  QuillModule,
        RouterModule.forChild(routes), HttpClientModule, MatDatepickerModule,   NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: '#78C000',
            innerStrokeColor: '#C7E596',
            animationDuration: 300,

        }),
    ],
    providers   : [ DatePipe , SubjectService

    ],
    entryComponents: [ LessionReplyDialogComponent, AssignmentDialogComponent, AssignmentQuestionDialogComponent]
})
export class SubjectDetailModule {
}
