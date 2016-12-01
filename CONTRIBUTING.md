# How to contribute

Firstly, thanks for taking an interset in this project! You are already an awesome person.

I have never maintained a project before that has other contributors, so if things get bumpy, we'll all try to remain patient and forgiving with each other.

The good news is, even the most beginner level contributor can feel right at home here - we are all beginners. If you've been thinking 'how can I find a beginner friendly opensource project to contribute to that still has a small codebase that won't overwhelm me' this is the project for you!

## You will need

+ A GitHub account
+ Git installed on your system
+ A can-do attitude

## Getting started

+ Fork this repo before making any changes - you will be initially pushing commits to your fork, not this repo.  
+ In folder `config` copy and rename the file `config_template.json` to `config.json`, but don't alter and don't delete `config_template.json`. You can then change `PORT` and `MONGODB_URI` values in your `config.json` if you need to (e.g. `"PORT": 5555`)  
  Your `config` folder should look like this:  
  ```
  config  
    
    |- config.js  
    |- config.json  
    |- config_template.json  
   ```
+ Create issues on **this** repo, not your fork, if you encounter bugs, non-ideal behaviour/css, or wish to request features.

## Your first PR (pull request)

To keep things beginner friendly, you can make a completely innocuous contribution first. You can add a comment to FIRST_PR_CLUB.md!

+ On your fork of this repo, locate the FIRST_PR_CLUB markdown file. It's in the root folder.
+ **Create a new branch to work on** (you'll do this for your real contributions, too).
  + At the terminal, in the correct folder, run `git checkout -b <new-branch-name>`
  + `<new-branch-name>` should be replaced with something sensible, like `jack-first-PR`
  + For your real contributions, you might choose a branch name like `issue-101` or `feature-info-modal`
  + All together: `git checkout -b jack-first-PR`
+ Make the change you want to FIRST_PR_CLUB.
  + I recommend using a horizontal line (Markdown: `--------`) to separate your entry
  + Include your name, your location, your experience level, and what fix you think you'll contriubute to the project!
  + Save your work!
+ Commit your change:
  + `git add FIRST_PR_CLUB`
  + `git commit -m <your-commit-message>`
    + e.g. `git commit -m 'adds Jackson\'s first pr'`
+ Push your change to your fork:
  + `git push origin <your-branch-name>`
+ Open a pull request. Follow the guide here: [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
  + @mention anyone you specifically want to review your PR
+ From there, a reviewer will go through the rest of the process with you.
  + You may be required to make changes to your code before it gets pulled in to the master branch - have patience and know that the difficult bits are done.
+ Celebrate! Now you are ready to contribute to this project more meaningfully! Welcome aboard!

+ Now you can delete your local and remote branches:
  + switch to `master` branch:  
    `git checkout master`
  + list all branches:  
    `git branch`  
    you should see `* master` and the second branch you created previously
  + now delete that second branch:  
    `git branch -D <name-of-the-branch>`
  + delete second branch from your GitHub:  
    `git push origin --delete <name-of-the-branch>`

## How to sync your local repo with the original repo

+ This setup should be done only once for the repo.  
  [source](https://help.github.com/articles/configuring-a-remote-for-a-fork/)  
  + List the current configured remote repository for your fork:  
    `git remote -v`  
    You should see two links with `origin` in front of them.  
    The links will begin either with `https` or `git@`
  + Specify a new remote upstream repository that will be synced with the fork:  
    `git remote add upstream https://github.com/JacksonBates/pair-backend.git`  
    or  
    `git remote add upstream git@github.com:JacksonBates/pair-backend.git`  
    depending on which protocol you saw in the first step.
  + Verify the new upstream repository you've specified for your fork:  
    `git remote -v`  
    now you should see four links: two `origin` and two `upstream`  


+ This should be done to check for updates on the remote repo:  
  [source](https://help.github.com/articles/syncing-a-fork/)
  + Get data from original repo:  
    `git fetch upstream`  
  + Switch to the `master` branch of your local repo:  
    `git checkout master`
  + Merge changes from the original repo into your local `master` branch:  
    `git merge upstream/master`
  + Now push changes to your GitHub repo:  
    `git push`

Now your local repo and your GitHub repo is up to date with the original repo you forked from.

## Making real contributions

If there is a particular issue you want to fix, communicate your intention via the comments on the specific issue. This will ensure that you are not working on something someone else is close to finishing, and also gives you the opportunity to discuss your approach and get any help or advice you may need before starting.

If the bug or feature you wish to work on is not yet in the existing issues, add it to the issues thread first and comment regarding your intention to work on it straight away.

Aside from that, stick to the fork-pull workflow outlined above under the section 'Your first PR.'

### Important
Please keep your commits and pull requests focused purely on the objectives discussed in your communications with the team (currently just me, but team sounds more legit). If you find _other minor bugs_, _typos_ or _whitespace issues_ while working on your feature / fix, rather than fixing them, please open a **new issue** and **leave it out of your current contribution**. Reviewing Pull Requests and comparing diffs will be much easier that way!


## Any questions?

Could this CONTRIBUTING file be improved? Was anything inaccurate or unclear? Please open up an issue and suggest appropriate fixes. Good documentation is just as crucial as good code - so documentation contributions are just as valued as fancy code contributions!
