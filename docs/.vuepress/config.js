module.exports = {
    title: '方位知识库',
    description: ' ',
    base:'/GithubDoc/',
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/image/logo.jpeg'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav.js'),
        sidebar: require('./sidebar.js'),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}

