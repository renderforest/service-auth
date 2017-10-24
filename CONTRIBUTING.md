# Contributing to service-auth

## Code Contributions

#### Step 1: Clone

Clone the project on [GitHub](https://github.com/renderforest/service-auth):
   
   ``` bash
   $ git clone https://github.com/renderforest/service-auth
   $ cd service-auth
   ```
   
For developing new features and bug fixes, the development branch should be pulled and built upon.

#### Step 2: Branch

Create a new topic branch to contain your feature, change, or fix:

   ``` bash
   $ git checkout -b <topic-branch-name>
   ```

#### Step 3: Commit

Make sure git knows your name and email address:

   ``` bash
   $ git config --global user.name "Example User"
   $ git config --global user.email "user@example.com"
   ```
    
Add and commit:

   ``` bash
   $ git add my/changed/files
   $ git commit
   ```
    
Commit your changes in logical chunks. Please adhere to these [Commit message guidelines](#commit-message-guidelines)
   or your code is unlikely be merged into the main project.

#### Step 4: Rebase

Use git rebase to synchronize your work with the main repository.

   ``` bash
   $ git fetch upstream
   $ git rebase upstream/master
   ```
   
#### Step 5: Push

Push your topic branch:

   ``` bash
   $ git push origin <topic-branch-name>
   ```

#### Step 6: Pull Request

Open a Pull Request with a clear title and description.


## Commit message guidelines


The commit message should describe what changed and why.

   1. The first line should:
       * contain a short description of the change
       * be 60 characters or less
       * be prefixed with the name of the changed subsystem
       * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code,
         like function/variable names
        
       Examples:
       
       ```
        lib: add changeTitle method to Project
        deps: add mime package to dependencies
        examples: fix typos in render-project.js
        helpers: refactor _setAreaImage in project.helper.js
       ```
   2. Keep the second line blank. 
          
   3. Wrap all other lines at 72 columns:
      * describe each line in logical chunks
      * start each line with: space hyphen space ( - ...)
      * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code,
        like function/variable names
      
      Examples:
      
      ```    
        - add private function isMedia to check media type
        - remove deprecated logger from Project
        - refactor private function isAudio used
        - add JSDoc on isMedia function
      ```
