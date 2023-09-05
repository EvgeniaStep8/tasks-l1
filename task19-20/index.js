// Объявляем переменную posts, сюда будем записывать массив полученных с сервера постов, count это количество постов в запросе, будем запрашивать по 10 постов, localStorageMaxSize - объём localStorage
let posts = [];
const count = 10;
let localStorageMaxSize;

const widget = document.querySelector(".widget");

// Функция для обработки данных полученных с сервера
const handleQuery = (result) => {
  result.response.items.forEach((item) => {
    posts.push(item);
  });
  renderPosts(result.response.items);
  setLocalStoragePosts(posts);
};

// Функция для получения постов из сообщества, для обхода cors использован протокол JSONP
const getPosts = (offset) => {
  const script = document.createElement("SCRIPT");
  script.src = `https://api.vk.com/method/wall.get?owner_id=-164992662&domain=ddxfitness/kartini_s_istoriei&offset=${offset}&count=${count}&filter=all&access_token=2914c1c32914c1c32914c1c30d2a0143a8229142914c1c34de7a3b7b2d6996882e55c7b&v=5.131&callback=handleQuery`;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// Функция создания поста, находим шаблон поста на странице, создаёт и возвращает разметку поста
const createPost = () => {
  const postTemplate = document.querySelector("#post-template").content;
  const post = postTemplate.querySelector(".post").cloneNode(true);

  return post;
};

// Функция добавления поста на страницу, получает объект данных о потсе, добавляет разметку поста с данными в конец элемента ч классом posts
const addPost = ({ attachments, text, likes, reposts, views }) => {
  const post = createPost();

  post.querySelector(".text").textContent = text;

  if (attachments.length > 0) {
    if (attachments[0].type === "photo") {
      post.querySelector(".image").src = attachments[0].photo.sizes.find(
        (size) => size.type === "q"
      ).url;
      post.querySelector(".image").alt = attachments[0].photo.text;
    }
  }

  post.querySelector(".likes").textContent = likes.count;
  post.querySelector(".reposts").textContent = reposts.count;
  post.querySelector(".views").textContent = views.count;

  document.querySelector(".posts").append(post);
};

// Функция отрисоловки постов, проходится по каждому эленту  переданного массива data и вызывает для него функцию addPost
const renderPosts = (data) => {
  data.forEach((post) => {
    addPost(post);
  });
};

// Функция добавления массива постов в виде строки (преобразуем через JSON.stringify) в localStorage, также для задачи 20 выводим объём занятого localStorage и его максимальный объём, если localStorage переполнен, удаляем первые 10 постов и рекурсивно вызываем функцию setLocalStoragePosts
const setLocalStoragePosts = (posts) => {
  try {
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log(
      `Занято ${(JSON.stringify(posts).length / 1000000).toFixed(
        1
      )} Мб из ${maxSize} Мб`
    );
  } catch {
    posts = posts.slice(count);
    setLocalStoragePosts(posts);
  }
};

// Функция отрисовки виджета при загрузки страницы, если в localStorage уже лежат посты, отрисовываем их, если нет вызываем функцию get posts, также выводи в консоль информацию о занятом месте в localStorage
const renderWidget = () => {
  if (localStorage.getItem("posts")) {
    posts = JSON.parse(localStorage.getItem("posts"));
    renderPosts(posts);
    console.log(
      `Занято ${(JSON.stringify(posts).length / 1000000).toFixed(
        1
      )} Мб из ${maxSize} Мб`
    );
  } else {
    getPosts(0);
    console.log(
      `Занято ${JSON.stringify(posts).length / 1000000} Мб из ${maxSize} Мб`
    );
  }
};

// Функция для подсчёта максимального размера LocalStorage, по аналогии с задачей 18 расчитываем объём LocalStorag, если в LocalStorag уже присутствуют посты, также учитываем их объём памяти
const countMaxLocalStorageSize = (() => {
  let testData = "";
  for (let i = 0; i < 10000; i++) {
    testData += "aaaaaaaa";
  }
  const step = testData;
  return () => {
    try {
      localStorage.setItem("test", testData);
      testData += step;
      trySetItem(testData, step);
    } catch {
      localStorage.removeItem("test");
      if (localStorage.getItem("posts")) {
        maxSize = (
          (testData.length + localStorage.getItem("posts").length) /
          1000000
        ).toFixed(1);
      } else {
        maxSize = testData.length / 1000000;
      }
    }
  };
})();

// При первичной отрисовки страницы вызываем функцию подсчёта объёма LocalStorage и отрисовки виджета
countMaxLocalStorageSize();
renderWidget();

// Навешиваем на виджет слушатель на скролл, при скроле когда подходим к концу ленты повторно запрашиваем новые посты, со смещением равным длине массива постов
widget.addEventListener("scroll", () => {
  if (widget.scrollHeight - widget.scrollTop < 550) {
    getPosts(posts.length);
  }
});
