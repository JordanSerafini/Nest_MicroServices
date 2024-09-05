import ReactDOM from 'react-dom';
import PdfGenerator from './PdfGenerator';

export const Pdftrain: React.FC = () => {
  const data = ['Élément 1', 'Élément 2', 'Élément 3'];

  return (
    <div>
      <PdfGenerator data={data} />
    </div>
  );
};

ReactDOM.render(<Pdftrain />, document.getElementById('root'));
