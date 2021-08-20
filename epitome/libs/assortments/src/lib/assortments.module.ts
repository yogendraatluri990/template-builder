import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// --------------------------------------------------------------
// @importing Angular material modules
// --------------------------------------------------------------
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// --------------------------------------------------------------
// @importing local page modules
import { MessengerModule} from './pages';
import { InlineEditorDirective } from './directives';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MessengerModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  exports: [    
    InlineEditorDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessengerModule,
  ],
  declarations: [InlineEditorDirective],  
})
export class AssortmentsModule {
  public static forRoot(): ModuleWithProviders<AssortmentsModule> {
    return {
      ngModule: AssortmentsModule,
      providers: [],
    };
  }
}
