import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@services/db';
import type { IUser } from '@components/PostPreview';

function Info({ name }: IUser) {
  return (
    <main className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-1">
        <article className="col-span-12 md:col-span-8 lg:col-span-6">
          <h1 className="text-4xl mt-2 mb-6">{name}</h1>
        </article>
      </div>
    </main>
  );
}

function UserInfo() {
  const { userName } = useParams();
  const authorArr = useLiveQuery(() =>
    db.authors.filter(({ username }) => username === userName).toArray(),
  );

  return authorArr
    ? authorArr.map(({ id, username, name, dob, createdAt }) => (
        <Info
          key={id}
          id={id}
          username={username}
          name={name}
          dob={dob}
          createdAt={createdAt}
        />
      ))
    : null;
}

export default UserInfo;
