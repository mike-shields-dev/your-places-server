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

router.get('/:uid', (req, res) => {
    const foundUser =
        USERS.find(({ id }) => id === req.params.uid);
    
    if (foundUser) {
        return res.json(foundUser);
    }

    return res
        .status(404)
        .json({ message: 'User not found' });
});

export default router;
