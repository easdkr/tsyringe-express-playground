import { container, singleton } from 'tsyringe';

export function Injectable(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    singleton()(target);
    container.register(target, target);
  };
}
