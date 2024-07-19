document.addEventListener("DOMContentLoaded", function() {
    const feedContainer = document.getElementById('feed');
    const sentinel = document.getElementById('sentinel');
    const templatePost = document.getElementById('template-post');

    function generateFakeData(post) {
        // Generar datos falsos con Faker
        const avatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${faker.datatype.uuid()}`;
        let username = faker.internet.userName();
        username = username.length > 15 ? username.slice(0, 15) : username;
        const postImage = `https://picsum.photos/id/${faker.datatype.number({ min: 1, max: 1000 })}/500/500`;
        const description = faker.lorem.sentences();
        const date = new Date().toLocaleDateString();

        // Actualizar los elementos del post
        post.querySelector('.avatar').src = avatar;
        post.querySelector('.username').textContent = username;
        post.querySelector('.date').textContent = date;
        post.querySelector('.post-header + div img').src = postImage;
        post.querySelector('.description').innerHTML = description;
    }

    function loadPosts() {
        for (let i = 0; i < 5; i++) {
            // Clonamos el post (Se usa como template)
            const newPost = templatePost.cloneNode(true);
            generateFakeData(newPost);
            feedContainer.insertBefore(newPost, sentinel);
        }
    }

    // Esto evita que el primer post no tenga info.
    generateFakeData(templatePost);

    // Configurar Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            loadPosts();
        }
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    observer.observe(sentinel);

    loadPosts();
});