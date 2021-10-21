;(function (e) {
  function t(t) {
    for (var r, u, a = t[0], i = t[1], f = t[2], l = 0, p = []; l < a.length; l++)
      (u = a[l]), Object.prototype.hasOwnProperty.call(o, u) && o[u] && p.push(o[u][0]), (o[u] = 0)
    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
    s && s(t)
    while (p.length) p.shift()()
    return c.push.apply(c, f || []), n()
  }
  function n() {
    for (var e, t = 0; t < c.length; t++) {
      for (var n = c[t], r = !0, u = 1; u < n.length; u++) {
        var i = n[u]
        0 !== o[i] && (r = !1)
      }
      r && (c.splice(t--, 1), (e = a((a.s = n[0]))))
    }
    return e
  }
  var r = {},
    o = { app: 0 },
    c = []
  function u(e) {
    return a.p + 'js/' + ({ about: 'about' }[e] || e) + '.' + { about: '17b742fc' }[e] + '.js'
  }
  function a(t) {
    if (r[t]) return r[t].exports
    var n = (r[t] = { i: t, l: !1, exports: {} })
    return e[t].call(n.exports, n, n.exports, a), (n.l = !0), n.exports
  }
  ;(a.e = function (e) {
    var t = [],
      n = o[e]
    if (0 !== n)
      if (n) t.push(n[2])
      else {
        var r = new Promise(function (t, r) {
          n = o[e] = [t, r]
        })
        t.push((n[2] = r))
        var c,
          i = document.createElement('script')
        ;(i.charset = 'utf-8'),
          (i.timeout = 120),
          a.nc && i.setAttribute('nonce', a.nc),
          (i.src = u(e))
        var f = new Error()
        c = function (t) {
          ;(i.onerror = i.onload = null), clearTimeout(l)
          var n = o[e]
          if (0 !== n) {
            if (n) {
              var r = t && ('load' === t.type ? 'missing' : t.type),
                c = t && t.target && t.target.src
              ;(f.message = 'Loading chunk ' + e + ' failed.\n(' + r + ': ' + c + ')'),
                (f.name = 'ChunkLoadError'),
                (f.type = r),
                (f.request = c),
                n[1](f)
            }
            o[e] = void 0
          }
        }
        var l = setTimeout(function () {
          c({ type: 'timeout', target: i })
        }, 12e4)
        ;(i.onerror = i.onload = c), document.head.appendChild(i)
      }
    return Promise.all(t)
  }),
    (a.m = e),
    (a.c = r),
    (a.d = function (e, t, n) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (a.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e
      var n = Object.create(null)
      if (
        (a.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          a.d(
            n,
            r,
            function (t) {
              return e[t]
            }.bind(null, r)
          )
      return n
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e['default']
            }
          : function () {
              return e
            }
      return a.d(t, 'a', t), t
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (a.p = '/'),
    (a.oe = function (e) {
      throw (console.error(e), e)
    })
  var i = (window['webpackJsonp'] = window['webpackJsonp'] || []),
    f = i.push.bind(i)
  ;(i.push = t), (i = i.slice())
  for (var l = 0; l < i.length; l++) t(i[l])
  var s = f
  c.push([0, 'chunk-vendors']), n()
})({
  0: function (e, t, n) {
    e.exports = n('cd49')
  },
  '4c9b': function (e, t, n) {},
  b684: function (e, t, n) {
    'use strict'
    n('4c9b')
  },
  cd49: function (e, t, n) {
    'use strict'
    n.r(t)
    n('e260'), n('e6cf'), n('cca6'), n('a79d')
    var r = n('7a23'),
      o = { id: 'nav' },
      c = Object(r['f'])('Home'),
      u = Object(r['f'])(' | '),
      a = Object(r['f'])('About')
    function i(e, t) {
      var n = Object(r['t'])('router-link'),
        i = Object(r['t'])('router-view')
      return (
        Object(r['p'])(),
        Object(r['d'])(
          r['a'],
          null,
          [
            Object(r['e'])('div', o, [
              Object(r['g'])(
                n,
                { to: '/' },
                {
                  default: Object(r['x'])(function () {
                    return [c]
                  }),
                  _: 1
                }
              ),
              u,
              Object(r['g'])(
                n,
                { to: '/about' },
                {
                  default: Object(r['x'])(function () {
                    return [a]
                  }),
                  _: 1
                }
              )
            ]),
            Object(r['g'])(i)
          ],
          64
        )
      )
    }
    n('b684')
    var f = n('d959'),
      l = n.n(f)
    const s = {},
      p = l()(s, [['render', i]])
    var b = p,
      d = (n('d3b7'), n('3ca3'), n('ddb0'), n('6c02')),
      v = n('cf05'),
      m = n.n(v),
      j = { class: 'home' },
      O = Object(r['e'])('img', { alt: 'Vue logo', src: m.a }, null, -1),
      h = [O]
    function g(e, t, n, o, c, u) {
      return Object(r['p'])(), Object(r['d'])('div', j, h)
    }
    var y = Object(r['h'])({ name: 'Home', components: {} })
    const w = l()(y, [['render', g]])
    var x = w,
      P = [
        { path: '/', name: 'Home', component: x },
        {
          path: '/about',
          name: 'About',
          component: function () {
            return n.e('about').then(n.bind(null, 'f820'))
          }
        }
      ],
      _ = Object(d['a'])({ history: Object(d['b'])('/'), routes: P }),
      k = _,
      S = n('5502'),
      M = Object(S['a'])({ state: {}, mutations: {}, actions: {}, modules: {} })
    Object(r['c'])(b).use(M).use(k).mount('#app')
  },
  cf05: function (e, t, n) {
    e.exports = n.p + 'img/logo.82b9c7a5.png'
  }
})
//# sourceMappingURL=app.e505981d.js.map
