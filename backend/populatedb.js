const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const bcrypt = require('bcrypt');

const userArr = [];

const createAdmin = async() => {
    const hashpass = await bcrypt.hash('odinadmin1', 10);

    const newuser = new User({
        username: 'NotAdmin',
        password: hashpass,
        status: 'Admin'
    });

    try {
        await newuser.save()
        .then(savedDoc => {
            userArr[0] = savedDoc
        })
        .catch(err => console.log(err))
        
    } catch(error) {
        console.log('failed to create admin');
    }
}


const addPost = async() => {
    const post1 = new Post({
        user: userArr[0],
        title:'The Villian Arc',
        body: 'The wave roared towards them with speed and violence they had not anticipated. They both turned to run but by that time it was too late. The wave crashed into their legs sweeping both of them off of their feet. They now found themselves in a washing machine of saltwater, getting tumbled and not know what was up or down. Both were scared, not knowing how this was going to end, but it was by far the best time of the trip thus far.',
        comments:[],
    });
    const post2 = new Post({
        user: userArr[0],
        title:'Berserk',
        body: `Patrick didn't want to go. The fact that she was insisting they must go made him want to go even less. He had no desire to make small talk with strangers he would never again see just to be polite. But she insisted that Patrick go, and she would soon find out that this would be the biggest mistake she could make in their relationship.
        `,
        comments:[],
    });
    const post3 = new Post({
        user: userArr[0],
        title:'United',
        body: `All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.`,
        comments:[],
    });
;

    await Promise.all([
        post1.save(),
        post2.save(),
        post3.save()
    ])
}

