function Info() {
  return (
    <article className="contacts">
      <h3>Контакти</h3>
      <p>
        Якщо у вас виникли якісь запитання при купівлі квитків або щось інше, ми
        будем раді вам допомогти.
      </p>
      <div>
        <strong>Адреса:</strong> м. Київ, вул. Шевченка 10А
      </div>
      <div>
        <strong>Графік роботи:</strong> <time>Пн - Нд: 11:00 - 22:00</time>
      </div>
      <div>
        <strong>Номер телефону:</strong>{' '}
        <a href="tel:097-22-97-311">097 22 97 311</a>
      </div>
      <div>
        <strong>Пошта:</strong>{' '}
        <a href="mailto: cinemafan@gmail.com">cinemafan@gmail.com</a>
      </div>
    </article>
  );
}

export default Info;
