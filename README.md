# DeadEnd for Visual Studio Code

[DeadEnd is a Ruby gem](https://github.com/zombocom/dead_end) that detects
syntax errors and finds the problem to have an easier time pinpointing where
issues in your Ruby code are.

## Usage

1. Add `dead_end` to your `Gemfile`:

```ruby
gem 'dead_end'
```

_(Note: all versions of `dead_end` are compatible with this extension, with the
only exception being 3.0.0)_

2. Execute:

```bash
$ bundle install
```

If your application is not calling `Bundler.require` then you must manually add a require

```ruby
require "dead_end"
```

3. Install the VS Code extension

## Screenshot

![screenshot showing usage of the dead_end vscode extension](dead-end-vscode.png)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/zombocom/dead_end-vscode. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/zombocom/dead_end-vscode/blob/main/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the DeadEnd project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/zombocom/dead_end-vscode/blob/main/CODE_OF_CONDUCT.md).
