import { FC } from 'react';

const CreateProduct: FC = () => {
  return (
    <div>
      <form>
        <label>Название</label>
        <input type='text' name='name' />
        <label>Описание</label>
        <input type='text' name='desc'></input>
        <label>Кол-во</label>
        <input type='number' name='amount'></input>
				<button>Создать</button>
      </form>
    </div>
  );
};

export { CreateProduct };
 