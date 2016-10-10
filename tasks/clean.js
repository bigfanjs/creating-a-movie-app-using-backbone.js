import del from 'del';

export default function () {
  return () => {
    del('public/buil/');
  };
}