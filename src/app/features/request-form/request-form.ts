import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccessDuration, EquipmentType, RequestPayload, RequestType } from './models/request.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RequestService } from '../../core/services/request';

@Component({
  selector: 'app-request-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './request-form.html',
  styleUrl: './request-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestForm {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly destroyRef = inject(DestroyRef);

  private readonly requestService = inject(RequestService);

  readonly submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  readonly requestTypes = [
    { value: 'equipment', label: 'Оборудование' },
    { value: 'software', label: 'Доступ к ПО' },
  ] as const;

  readonly form = this.fb.group({
    type: this.fb.control<RequestType>('equipment'),
    employeeName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    equipment: this.fb.control<EquipmentType | ''>(''),
    quantity: [1],
    service: [''],
    accessDuration: this.fb.control<AccessDuration>('30'),
    comment: ['', Validators.maxLength(500)],
  });

  constructor() {
    this.initFormValidation();
    this.initSubmissionStatusReset();
  }

  private updateValidators(type: RequestType): void {
    const { equipment, quantity, service, accessDuration } = this.form.controls;

    if (type === 'equipment') {
      equipment.setValidators(Validators.required);
      quantity.setValidators([Validators.required, Validators.min(1), Validators.max(10)]);

      service.clearValidators();
      accessDuration.clearValidators();

      service.reset('');
      accessDuration.reset('30');
    } else {
      service.setValidators(Validators.required);
      accessDuration.setValidators(Validators.required);

      equipment.clearValidators();
      quantity.clearValidators();

      equipment.reset('');
      quantity.reset(1);
    }

    [equipment, quantity, service, accessDuration].forEach((control) => {
      control.updateValueAndValidity({ emitEvent: false });
    });
  }
  private initFormValidation(): void {
    const typeControl = this.form.controls.type;

    this.updateValidators(typeControl.value);

    typeControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((type) => {
      this.updateValidators(type);
    });
  }

  private initSubmissionStatusReset(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.submissionStatus() !== 'submitting') {
        this.submissionStatus.set('idle');
      }
    });
  }

  submit(): void {
    if (this.submissionStatus() === 'submitting') {
      return;
    }

    this.form.markAllAsTouched();

    if (this.form.invalid || this.form.pending) {
      return;
    }

    const value = this.form.getRawValue();

    const commonFields = {
      employeeName: value.employeeName.trim(),
      email: value.email.trim(),
      comment: value.comment.trim(),
    };

    let payload: RequestPayload;

    if (value.type === 'equipment') {
      if (!value.equipment) {
        return;
      }

      payload = {
        ...commonFields,
        type: 'equipment',
        equipment: value.equipment,
        quantity: value.quantity,
      };
    } else {
      payload = {
        ...commonFields,
        type: 'software',
        service: value.service.trim(),
        accessDuration: value.accessDuration,
      };
    }

    this.submissionStatus.set('submitting');

    this.requestService
      .submit(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.submissionStatus.set('success');
          console.log('Created request:', response, payload);
        },
        error: () => {
          this.submissionStatus.set('error');
        },
      });
  }
}
