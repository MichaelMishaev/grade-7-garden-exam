import { fakeRubrics } from './fake-rubrics.mjs';

process.env.OPEN_RUBRICS_JSON = JSON.stringify(fakeRubrics());
delete process.env.OPEN_RUBRICS_FILE;
