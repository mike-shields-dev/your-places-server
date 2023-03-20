import express from 'express';
const router = express.Router();

const USERS = [
    {
        id: 'user0',
        name: 'Sarah Brightman',
        places: [2],
        image: 'https://i.pravatar.cc/200?img=0'
    },
    {
        id: 'user1',
        name: 'Louise Makinson',
        places: [5],
        image: 'https://i.pravatar.cc/200?img=1'
    },
    {
        id: 'user2',
        name: 'James Brampton',
        places: [4],
        image: 'https://i.pravatar.cc/200?img=4'
    },
    {
        id: 'user3',
        name: 'Scott Davies',
        places: [9],
        image: 'https://i.pravatar.cc/200?img=3'
    },
];

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

router.get('/:uid', (req, res) => {
    const foundUser =
        USERS.find(({ id }) => id === req.params.uid);
    
    if (foundUser) {
        return res.json(foundUser);
    }

    const error = new Error(errorMsg('user', 'user'))
    error.code = 404;
    
    next(error);
});

export default router;
