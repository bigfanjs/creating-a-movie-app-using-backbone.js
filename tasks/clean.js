import del from 'del';

export default function () {
  return () => {
    del.sync('../build/', { force: true });
  };
}