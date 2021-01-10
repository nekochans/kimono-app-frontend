import { JwkList } from './entity';

export type FetchCognitoJsonWebKeys = () => Promise<JwkList>;
