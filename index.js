import core from '@actions/core';
import { publishArticles } from './lib/publish.js';

async function run() {
  try {
    const devtoKey = core.getInput('devto_key');
    const githubToken = core.getInput('github_token');
    const filesGlob = core.getInput('files');
    const branch = core.getInput('branch');
    const useConventionalCommits = core.getInput('conventional_commits');
    const dryRun = core.getInput('dry_run');

    core.setSecret(devtoKey);
    core.setSecret(githubToken);

    core.debug(
      JSON.stringify({
        devtoKey,
        githubToken,
        filesGlob,
        branch,
        useConventionalCommits,
        dryRun
      })
    );

    const output = await publishArticles({
      filesGlob,
      devtoKey,
      githubToken,
      branch,
      useConventionalCommits,
      dryRun
    });
    
    core.setOutput('result_json', JSON.stringify(output));
  } catch (error) {
    core.setFailed(error.toString());
  }
}

run();
