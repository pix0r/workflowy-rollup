(function () {
    var valueFromString = function (s) {
        var pats = [/\[(\d+\.?\d*)\]$/, /\((\d+\.?\d*)\)$/, /\s(\d+\.?\d*)$/];
        for (var k in pats) {
            var pat = pats[k];
            var r = s.match(pat);
            if (r) {
                return parseFloat(r[1]);
            }
        }
        return 0.0;
    };
    var nodeValue = function (el) {
        var value = $(el).attr('data-node-value');
        if (value === undefined) {
            var name = $(el).children('.name').children('.content').text();
            var myVal = valueFromString(name);
            var childVals = 0.0;
            $(el).children('.children').children('.project').each(function (idx, childEl) {
                childVals += nodeValue(childEl);
            });
            value = myVal + childVals;
            $(el).attr('data-node-value', value);
        }
        return value;
    };
    var addRollups = function () {
        $('.project').each(function (idx, el) {
            val = nodeValue(el);
            if (val != 0) {
                $(el).addClass('js-changed-name');
                $name = $(el).children('.name').children('.content');
                $(el).attr('data-original-name', $name.text());
                $name.append(" &mdash; " + nodeValue(el));
            }
        });
    };
    var removeRollups = function () {
        $('.js-changed-name').each(function (idx, el) {
            $(el).children('.name').children('.content').text($(el).attr('data-original-name'));
            $(el).removeClass('js-changed-name');
        });
    };
    var toggleRollups = function () {
        if (window.rollupsToggled) {
            removeRollups();
            window.rollupsToggled = 0;
        } else {
            addRollups();
            window.rollupsToggled = 1;
        }
    };
    toggleRollups();
    $('#toggleButton').click(toggleRollups);
})();
