export const dummyPosts: IPost[] = [
  {
    title: "10 Tips for Writing Clean Code",
    content:
      "Clean code is about making your code readable and maintainable for others and your future self...",
    category: "Programming",
    featuredImage: "https://picsum.photos/id/1/800/600", // desk/keyboard style image
    author: "john_doe",
    attachments: [
      "https://github.com/py-pdf/sample-files/raw/main/pdfs/hello-world.pdf",
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_CSV_5000.csv",
    ],
    likes: ["alice", "bob", "charlie"],
    comments: [
      {
        user: "alice",
        text: "Super helpful, thanks for sharing!",
        likes: ["bob"],
        createdAt: new Date("2025-05-15T10:00:00Z"),
      },
    ],
    createdAt: new Date("2025-05-14T09:00:00Z"),
    updatedAt: new Date("2025-05-15T12:00:00Z"),
  },
  {
    title: "Exploring the Mountains of Nepal",
    content:
      "Nepal's mountains are home to legendary trails and majestic scenery...",
    category: "Travel",
    featuredImage: "https://picsum.photos/id/1015/800/600", // mountain/lake landscape
    author: "travel_guru",
    attachments: [
      "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
    ],
    likes: ["dave", "emma"],
    comments: [
      {
        user: "emma",
        text: "I’ve been to Annapurna – breathtaking views!",
        likes: ["dave"],
        createdAt: new Date("2025-05-13T08:15:00Z"),
      },
    ],
    createdAt: new Date("2025-05-12T16:00:00Z"),
    updatedAt: new Date("2025-05-13T08:30:00Z"),
  },
  {
    title: "Mastering React Hooks in 2025",
    content:
      "React Hooks give you powerful features with less code. This guide shows real-world examples of useState, useEffect, and custom hooks.",
    category: "Web Development",
    featuredImage: "https://picsum.photos/id/180/800/600", // tech setup
    author: "frontend_dev",
    attachments: [
      "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3",
    ],
    likes: ["alice", "john_doe"],
    comments: [
      {
        user: "john_doe",
        text: "Very relevant and to the point. Thanks!",
        likes: [],
        createdAt: new Date("2025-05-14T14:45:00Z"),
      },
    ],
    createdAt: new Date("2025-05-13T10:00:00Z"),
    updatedAt: new Date("2025-05-14T15:00:00Z"),
  },
  {
    title: "How to Take Better Portrait Photos",
    content:
      "Learn the secrets of good lighting, posing, and composition for better portraits.",
    category: "Photography",
    featuredImage: "https://picsum.photos/id/1027/800/600", // portrait photo of a person
    author: "lensqueen",
    attachments: [
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls",
    ],
    likes: ["emma", "bob", "charlie"],
    comments: [
      {
        user: "bob",
        text: "Great tips! Just tried these out today.",
        likes: ["emma"],
        createdAt: new Date("2025-05-10T17:00:00Z"),
      },
    ],
    createdAt: new Date("2025-05-09T13:00:00Z"),
    updatedAt: new Date("2025-05-10T17:15:00Z"),
  },
  {
    title: "Healthy Smoothie Recipes for Summer",
    content:
      "Try these 5 delicious smoothie recipes packed with vitamins and flavor.",
    category: "Health & Fitness",
    featuredImage: "https://picsum.photos/id/1080/800/600", // food/fruit related image
    author: "fitfoodie",
    attachments: [
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_JPG_100kB.jpg",
    ],
    likes: ["alice", "emma", "dave"],
    comments: [
      {
        user: "dave",
        text: "Tried the mango one – delicious!",
        likes: ["emma"],
        createdAt: new Date("2025-05-12T09:00:00Z"),
      },
    ],
    createdAt: new Date("2025-05-11T07:00:00Z"),
    updatedAt: new Date("2025-05-12T09:10:00Z"),
  },
];
