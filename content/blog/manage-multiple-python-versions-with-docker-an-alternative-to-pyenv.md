+++
categories = []
date = 2021-12-03T05:00:00Z
description = "Most devs don't need a complicated setup for Python, they just need to get running. Leverage a single Docker command to run any version in isolation."
draft = true
images = []
tags = []
title = "Manage multiple Python versions with Docker: an alternative to Pyenv"

+++
You open a project to contribute code and quickly realize it requires a specific Python version you don't have. Not only that, but it's managing dependencies with some tool you don't have, like Pipenv or Poetry. What are your options? You could spend a while setting up your machine with a [fancy Python development environment](https://jacobian.org/2019/nov/11/python-environment-2020/), or you could get up and running right away using Docker as a Python version manager - which works the same across [MacOS, Windows, and Linux](https://docs.docker.com/get-docker/).

## Who is this for?

👍 Use this Docker strategy if you:

* want a hassle-free way to develop on a project (such as an API or package) without fiddling with system setup.
* Infrequently work on Python projects.

👎 Use the traditional setup with `pyenv` if you:

* are confident in command line concepts like PATH, dot files, Python virtual environments, and your ability to fix any issues that might crop up.
* Work with a large number of Python projects.

⚠️ If you're trying to install a CLI tool or script written in Python, you'll want to explore tools like [Pipx](https://github.com/pypa/pipx). It's possible to run scripts in containers, but I wouldn't recommend for everyone.

## Why use Docker as a Python version manager instead of Pyenv?

Why would you bother managing Python versions and environments with Docker when there are tools built to do it for you?

* ⭐ **Most developers don't need a fancy Python set up.** ⭐ In my experience, there are plenty of developers who just want to get up and running on a project rather than tinkering with their system config, especially if they rarely work with Python. Not everyone wants to play with [dotfiles ](https://github.com/search?q=dotfiles)and development environments (😬 I do though, send me your tricks I love them). This approach only requires 1 Docker command.
* **Docker has a wide range of use cases, Pyenv has just one**. Installing Docker to manage Python versions is just the tip of the iceberg of what it can do. Even if you decide you don't like this approach, there will be other uses in the future. If you already have it installed, then one less step!
* **Avoiding tool maintenance**. The combination of Pyenv + Pipenv/Poetry/etc. is _usually_ a well-oiled machine. If an issue arises though, it can be frustrating to debug what's wrong with your command line tools. The article you were copying setup commands from won't be there when things breaks.

Enough chatter, now shut up and tell me how!

## Manage multiple Python versions and environments with Docker

A prerequisite to managing Python versions with containers is to have either [Docker](https://docker.com) or [Podman](https://podman.io/) installed on your machine. Once ready, follow the steps below:

    #Step 1
    git clone <your-repo>.git
    cd <your-repo>
    # Step 2 & 3: creates container that is destroyed after session
    docker run -it --rm --name python-runner -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:3.7 bash 
    
    # OPTIONAL ALTERNATIVE> Step 2,3,& 3a: retain container between sessions
    docker run -it --name <project-name> -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:3.7 bash
    # .... many hours later...
    docker start -i <project-name>
    
    # Step 4
    # install dependencies following the directions based on your project

### Explanation

1. Clone the project you are trying to work with (not inside a container, we don't want to deal with connecting to GitHub or IDEs from the container if we can help it. [Keep it simple](https://en.wikipedia.org/wiki/KISS_principle)).
2. Choose the image version. Most common will be `3.6, 3.7, 3.8, 3.9,` or `3.10` , but you can find every available option on [Docker Hub](https://hub.docker.com/_/python/). Your image will then be `python:<chosen-version>`.
3. Use the `docker run` command to create a transient container (swap version if needed). The `bash` on the end, along with `-it` tells Docker to give us an interactive shell, just like when you open a new terminal prompt. The `-v` and `-w` make the current directory available inside the container, so you'll need to always run this command from the project.
   * **(Optional)** - If you will be working with this project a lot, a couple small tweaks will let you reuse the same container. Give it a good `--name` that you will recognize and remove the `--rm` (which removes the container when the current run finishes). Now in the future, you can use `docker start -i project-name` to pop open the shell, rather than needing to create a brand new container and install dependencies again.
4. Install dependencies following the instructions in next section.

## Next step: managing dependencies

Now you've got a container running with the Python version the project needs, how can you handle required dependencies? You may need to install a tool inside your running container depending on how the project is configured, directions for the most common options are below. These commands should be run in the container shell created by the `docker run` command, not on your local system.

### Pip (`requirements.txt`)

Nothing special needed here, run `pip install --user -r requirement.txt` and you're off the the races.

### Pipenv (`Pipfile.lock`)

Couple extra steps needed to get a [Pipenv](https://pipenv.pypa.io/en/latest/) project running.

    pip install --user pipenv
    # Ensure tool is available in your container's PATH
    echo "export PATH=~/.local/bin:$PATH" >> ~/.bashrc
    . ~/.bashrc # equivalent to 'source ~/.bashrc'
    pipenv install --dev

### Poetry (`poetry.lock`)

Check the [Poetry docs](https://python-poetry.org/docs/master/#installation) to ensure install command is up to date.

    curl -sSL <https://install.python-poetry.org> | python3 -
    # Ensure tool is available in your container's PATH
    echo "export PATH=~/.local/bin:$PATH" >> ~/.bashrc
    . ~/.bashrc # equivalent to 'source ~/.bashrc'
    poetry install

## FAQ

* 🙋 _Does this take the place of virtualenv?_
  * 📣 Yes and no. You can use it that way (see Pip section above), but many projects will already use a tool like Pipenv for managing dependencies, which has virtual environments baked in. Docker adds an extra level of isolation in this case, but doesn't replace the management of dependency versions, etc.
* 🙋 _Can I still use my favorite IDE/text editor to edit files locally?_
  * 📣 Yes, all the files are still on your local machine since the container is using them with a volume mount.
* 🙋 _Can I access any file on my system inside the Docker container?_
  * 📣 Only the original [working directory](https://explainshell.com/explain/1/pwd) will be attached inside your container, all the other files on system and in container are isolated from each other.
* 🙋 _How do I access_ [_localhost_](http://localhost) _if my Flask/Django/etc. app is running in a container?_
  * 📣 Docker isolates your code in a container separate from the rest of the system, so you'll have to add an argument to the `run` command to expose the port. Something like `-p 8080:80 -p 443:443` is the recommended route to map <localhost-port>:<container-port>. [Read more on StackOverflow](https://stackoverflow.com/questions/37981001/how-can-i-run-a-docker-container-on-localhost-over-the-default-ip).
* 🙋 _How do I install packages if my company blocks PyPi and has their own internal package repository?_
  * 📣 You'll need to [add an argument to Pip command](https://pip.pypa.io/en/stable/cli/pip_install/#install-index-url), `-i,--index-url`.

## Conclusion

This simpler approach to managing Python versions is another tool in your toolbox, and it can be applied for other languages as well. Hopefully you find success using this to get up and running on projects rather than fiddling with system configurations. Let me know if you have suggestions on ways to make it even simpler and improve it for future users.