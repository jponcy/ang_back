import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

function init() {
    const result = [];

    for (let i = 1; i < 1000; i++) {
        result.push({
            id: i,
            username: `Toto${i}`,
            avatar: `https://fakeimg.pl/${i + 100}/`,
            job: (i % 2 ? 'Développeur' : 'Graphiste'),
        });
    }

    return result;
}

const users = init();

@Injectable()
export class UserService {
    getAll() {
        return of(users).pipe(delay(200));
    }

    getOne(userId: number) {
        const user = users.find(u => u.id === userId);

        console.log('Retrieve', {user, userId});

        return of(user).pipe(delay(200));
    }
}
