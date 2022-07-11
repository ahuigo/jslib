# Go into your project's working directory
cd ~/www/fresh

# Collect your coverage profile with deno test --coverage=<output_directory>
deno test -A --coverage=cov_profile

# From this you can get a pretty printed diff of uncovered lines
deno coverage cov_profile

# Or generate an lcov report
deno coverage cov_profile --lcov --output=cov_profile.lcov

# Which can then be further processed by tools like genhtml
genhtml -o cov_profile/html cov_profile.lcov