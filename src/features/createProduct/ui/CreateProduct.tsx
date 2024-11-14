import { FC } from 'react';

const CreateProduct: FC = () => {
  return (
    <div>
      <form>
        <label>Название продукта</label>
        <input type='text' name='name' />
      </form>
    </div>
  );
};

export {CreateProduct}