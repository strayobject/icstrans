var icsTransFilter = angular.module('icsTransFilters', ['ngSanitize']);

icsTransFilter.filter('morse', function () {
  function translate(input, opt) {
    input       = input || '';
    var out     = '';
    var char    = '';
    var trans   = '';
    var i       = 0;
    var options = {};

    angular.extend(options, {
      type:'morse'
    }, opt);

    for (i = 0; i < input.length; i++) {
      char = input[i].toLowerCase();

      if (char === "\n" || char === "\r\n") {
        out += '<div class="clearfix"></div>';
        continue;
      }

      trans = options.code[char];

      if (trans !== undefined) {
        out += wrapInHtml(char, trans, options);
      } else {
        out += wrapInHtml(char, char, options);
      }
    }

    return out;
  }

  return translate;
});
icsTransFilter.filter('semaphore', function () {
  function translate(input, opt) {
    input        = input || '';
    var out      = '';
    var char     = '';
    var prevChar = '';
    var trans    = '';
    var i        = 0;
    var options  = {};

    angular.extend(options, {
      type:'semaphore'
    }, opt);

    for (i = 0; i < input.length; i++) {
      char = input[i].toLowerCase();

      if (char === "\n" || char === "\r\n") {
        out += '<div class="clearfix"></div>';
        continue;
      }

      trans = options.code[char];

      if (trans !== undefined) {
        // numeral sign
        if (!isNaN(parseInt(char)) && isNaN(parseInt(prevChar))) {
          out += wrapInHtml('#', '<img src="/assets/images/' + options.code['numeric'] +'" alt="' + char + '"/>', options);
        }
        // back to letters
        else if (isNaN(parseInt(char)) && !isNaN(parseInt(prevChar))) {
          out += wrapInHtml('xyz', '<img src="/assets/images/' + options.code['j'] +'" alt="(literal)"/>', options);
        }

        out += wrapInHtml(char, '<img src="/assets/images/' + trans + '" alt="' + char + '"/>', options);
      } else {
        out += wrapInHtml(char, char, 'semaphore');
      }

      prevChar = char;
    }

    return out;
  }

  return translate;
});
icsTransFilter.filter('flag', function () {
  function translate(input, opt) {
    input       = input || '';
    var out     = '';
    var char    = '';
    var trans   = '';
    var i       = 0;
    var options = {};

    angular.extend(options, {
      type:'flag'
    }, opt);

    for (i = 0; i < input.length; i++) {
      char = input[i].toLowerCase();

      if (char === "\n" || char === "\r\n") {
        out += '<div class="clearfix"></div>';
        continue;
      }

      trans = options.code[char];

      if (trans !== undefined) {
        out += wrapInHtml(char, '<img src="/assets/images/' + trans + '" alt="' + char + '"/>', options);
      } else {
        out += wrapInHtml(char, char, options);
      }
    }

    return out;
  }

  return translate;
});

function wrapInHtml(key, val, options)
{
  if (options.phonetic) {
    if (options.phoneticCode[key] !== undefined) {
      val += '<span>' + options.phoneticCode[key] + '</span>';
    } else {
      val += '<span>' + key + '</span>';
    }
  }

  if (options.type === 'morse') {
    return '<div class="sign col-lg-1 col-md-2 col-sm-2 col-xs-2">' + val + '</div>';
  } else {
    return '<div class="sign col-lg-2 col-md-2 col-sm-2 col-xs-4">' + val + '</div>';
  }
}