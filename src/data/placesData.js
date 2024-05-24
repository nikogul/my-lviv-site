// src/data/placesData.js

export const placesData = [
    {
      id: 1,
      name: 'Кав\'ярня Лева',
      description: 'Затишна кав\'ярня у центрі Львова.',
      tags: ['кафе'],
      rating: 9,
      location: [49.8397, 24.0297],
      reviews: [
        { user: 'Олена', comment: 'Дуже сподобалось!', rating: 9 },
        { user: 'Іван', comment: 'Смачна кава, рекомендую.', rating: 10 }
      ],
      imageUrl: '' // Зображення відсутнє
    },
    {
      id: 2,
      name: 'Ресторан Бачевських',
      description: 'Розкішний ресторан з українською кухнею.',
      tags: ['ресторан'],
      rating: 10,
      location: [49.8413, 24.0321],
      reviews: [
        { user: 'Марія', comment: 'Чудове місце для святкування.', rating: 10 },
        { user: 'Петро', comment: 'Смачні страви і гарна атмосфера.', rating: 9 }
      ],
      imageUrl: '' // Додайте шлях до зображення
    }
  ];
  