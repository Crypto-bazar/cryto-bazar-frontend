import { FC } from 'react';

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <section className="text-center py-16 bg-gradient-to-b from-indigo-900 to-indigo-600 rounded-3xl shadow-lg mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">CryptoBazar NFT Marketplace</h1>
        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Покупайте, продавайте и создавайте уникальные NFT. Откройте для себя цифровое искусство, коллекционные предметы и многое другое на нашей децентрализованной платформе.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/nfts" className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-full shadow hover:bg-indigo-100 transition">Посмотреть NFT</a>
        </div>
      </section>
      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white/80 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-indigo-800">Децентрализация</h2>
          <p className="text-indigo-700">Ваша коллекция и транзакции полностью защищены и прозрачны благодаря блокчейну.</p>
        </div>
        <div className="bg-white/80 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-indigo-800">Уникальные NFT</h2>
          <p className="text-indigo-700">Огромный выбор уникальных токенов: искусство, музыка, коллекционные предметы и многое другое.</p>
        </div>
        <div className="bg-white/80 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-indigo-800">Простота использования</h2>
          <p className="text-indigo-700">Интуитивный интерфейс для покупки, продажи и создания NFT в пару кликов.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
