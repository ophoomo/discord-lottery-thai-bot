FROM denoland/deno:1.32.5

# The port that your application listens to.
EXPOSE 80

WORKDIR app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when mod.ts is modified).
# Ideally cache mod.ts will download and compile _all_ external files used in main.ts.
COPY mod.ts .
RUN deno cache mod.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]