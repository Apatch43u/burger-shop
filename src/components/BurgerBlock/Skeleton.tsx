import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={470}
      viewBox='0 0 280 470'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect x='10' y='0' rx='30' ry='30' width='260' height='260' />
      <rect x='0' y='270' rx='0' ry='0' width='280' height='27' />
      <rect x='0' y='317' rx='0' ry='0' width='280' height='88' />
      <rect x='16' y='425' rx='0' ry='0' width='90' height='35' />
      <rect x='150' y='420' rx='30' ry='30' width='125' height='45' />
    </ContentLoader>
  );
};

export default Skeleton;
