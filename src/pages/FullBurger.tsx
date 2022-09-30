import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { burgerHref } from '../requests/requests';

const FullBurger: React.FC = () => {
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getFullBurger = async () => {
      try {
        const { data } = await axios.get(`${burgerHref}${id}`);
        setItem(data);
      } catch (error) {
        alert('Error -> ' + error);
        navigate('/');
      }
    };

    getFullBurger();
  }, []);

  if (!item) {
    return <>'Loading...'</>;
  }
  return (
    <div className='container'>
      <img src={item.imageUrl} width={300} height={300} alt='burger' />
      <h2>{item.title}</h2>
      <h4>{item.price}</h4>
    </div>
  );
};

export default FullBurger;
