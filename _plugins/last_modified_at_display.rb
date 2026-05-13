require 'yaml'

module Jekyll
  module LastModifiedAtDisplay
    def self.explicit_last_modified_at?(item)
      source_path = File.expand_path(item.path, item.site.source)
      return false unless File.file?(source_path)

      content = File.read(source_path)
      match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
      return false unless match

      front_matter = YAML.safe_load(
        match[1],
        permitted_classes: [Date, Time, Symbol],
        aliases: true,
      )

      front_matter.is_a?(Hash) && front_matter.key?('last_modified_at')
    rescue Psych::SyntaxError, ArgumentError, TypeError
      false
    end
  end

  Jekyll::Hooks.register([:posts, :pages, :documents], :post_init) do |item|
    item.data['has_explicit_last_modified_at'] = Jekyll::LastModifiedAtDisplay.explicit_last_modified_at?(item)
  end
end