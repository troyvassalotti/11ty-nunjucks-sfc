const CleanCSS = require("clean-css")
const {minify} = require("terser")

module.exports = function (config) {
    // add a css minifier filter from clean-css
    config.addFilter("cssmin", function (code) {
        return new CleanCSS({level: 2}).minify(code).styles;
    })

    // add javascript minifier
    config.addNunjucksAsyncFilter(
        "jsmin",
        async function (code, callback) {
            try {
                const minified = await minify(code);
                callback(null, minified.code)
            } catch (err) {
                console.error("Terser error: ", err);
                // Fail gracefully.
                callback(null, code)
            }
        }
    )

    // Change layouts location and markdown engine
    return {
        markdownTemplateEngine: "njk",
        dir: {
            layouts: "_includes/layouts",
        },
    };
}