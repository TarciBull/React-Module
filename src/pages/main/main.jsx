import Typography from '@mui/material/Typography';

export function Main (){ 
    return (
        <Typography >
        <h1>SPA "Internet shops"</h1>

        <h2>Аплікація - це інтернет-магазин.</h2>
       <p>Аплікація розроблена під бекенд, який можна взяти із гіт хаб за <a href="https://github.com/zholeh/a-level-react-back" target="blank">лінкою</a></p> 
        
       <ul>Аплікація повинна мати наступні роути:
        <li > 1. products</li>
        <li> 2. categories</li>
        <li> 3. curency</li>
        <li> 4. Головна сторінка</li>
       </ul>
       
       
       
       
        
       <h2>
       <ul>Аплікація повинна мати меню із трьох пунктів:
       <li>1.Перехід на необхідний роут</li>
        <li>2.Поточна валюта. Дані для продуктів повинні постійно перераховувати ціну продукту з урахуванням поточної валюти. 
        При натисканні на меню, потрібно відобразити список доступних валют із можливістю змінити поточну валюту.</li>
        <li>3.Іконка "Кошик", яка відображає кількість замовлених товарів.</li>
       </ul>
       
       </h2> 

        <p>Роут "products" повинен відображати дані, які отримуємо з API бекенду для продуктів.
        Приклад запиту можна отримати з Oen API документації.
        Він відображає список продуктів з пагінацією.
        Ціна на продукт повинна бути розрахована для поточної валюти.
        Кожен рядок крім даних відображає кнопку "Додати до кошика".</p>
        <p> Роут "categories" повинен відображати дані, які отримуємо з API бекенду для категорій.
        Приклад запиту можна отримати з Oen API документації.
        Він відображає список category з пагінацією.</p>
        <p>Роут "curency" повинен відображати дані, які отримуємо з API бекенду для валют.
        Приклад запиту можна отримати з Oen API документації.
        Він відображає список curency без пагінації.</p>
       
        
        
        
       <p>Роут "Головна сторінка" повинна відображати опис дипломної роботи.</p> 
        
       <h3>Кошик</h3> 

       <p><ul>При виборі "Кошик" з головного меню, відкривається модальне вікно підтвердження замовлення покупця.
        Форма має наступні поля<li> 1. first name - строковий тип даних, мінімальна довжина 1, максимальна - 20 символів.</li>
        <li> 2. last name - строковий тип даних, мінімальна довжина 1, максимальна - 20 символів.</li>
        <li>3. email - строковий тип даних, формат даних email.</li>
        <li> 4. Список із замовлених товарів</li>
        <li> 4.1. Кількість - число, мінімальне значення - 1.</li>
        <li> 4.2. Інформація о ціні</li>
        <li> 4.3. Інформація о сумі</li>
        <li>4.4. Кнопка "Видалити" із кошика.</li>
        <li> 5. Підсумкова інформація о загальній вартості замовлення.</li>
        <li> 6. Кнопка "Підтвердити"</li>
        <li> 6.1. Мінімальна кількість заказаних товарів - 1,</li>
        <li> 6.2. Неможливо підтвердити, якщо дані не заповнені, але заповнені не коректно.</li>
        <li>6.3. Якщо усі дані ведені правильно, повинен відправлятися запит на створення замовлення на беку. </li>
        <li>Приклад запиту можна отримати з Open Api документації бекенду. Кошик залишається пустою.</li>
        <li> 7. Кнопка "Продовжити покупки" - закриває вікно.</li></ul></p>
       
        </Typography >
    )
}
  