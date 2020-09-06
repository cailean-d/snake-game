import { LabelBackground } from '/core/interfaces';

export class Label {
  constructor(
    public text: string,
    public color = '#000',
    public size = 16,
    public font = 'Courier, serif',
    public style: 'normal' | 'bold' | 'italic' = 'normal',
    public align: 'center' | 'left' | 'right' = 'left',
    public baseLine: 'middle' | 'top' | 'bottom' = 'top',
    public background?: LabelBackground,
  ) {}
}
