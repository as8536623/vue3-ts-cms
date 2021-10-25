;(function (e) {
  function t(t) {
    for (var o, a, u = t[0], i = t[1], l = t[2], s = 0, f = []; s < u.length; s++)
      (a = u[s]), Object.prototype.hasOwnProperty.call(r, a) && r[a] && f.push(r[a][0]), (r[a] = 0)
    for (o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o])
    p && p(t)
    while (f.length) f.shift()()
    return c.push.apply(c, l || []), n()
  }
  function n() {
    for (var e, t = 0; t < c.length; t++) {
      for (var n = c[t], o = !0, a = 1; a < n.length; a++) {
        var i = n[a]
        0 !== r[i] && (o = !1)
      }
      o && (c.splice(t--, 1), (e = u((u.s = n[0]))))
    }
    return e
  }
  var o = {},
    r = { app: 0 },
    c = []
  function a(e) {
    return u.p + 'js/' + ({ about: 'about' }[e] || e) + '.' + { about: '425938fe' }[e] + '.js'
  }
  function u(t) {
    if (o[t]) return o[t].exports
    var n = (o[t] = { i: t, l: !1, exports: {} })
    return e[t].call(n.exports, n, n.exports, u), (n.l = !0), n.exports
  }
  ;(u.e = function (e) {
    var t = [],
      n = r[e]
    if (0 !== n)
      if (n) t.push(n[2])
      else {
        var o = new Promise(function (t, o) {
          n = r[e] = [t, o]
        })
        t.push((n[2] = o))
        var c,
          i = document.createElement('script')
        ;(i.charset = 'utf-8'),
          (i.timeout = 120),
          u.nc && i.setAttribute('nonce', u.nc),
          (i.src = a(e))
        var l = new Error()
        c = function (t) {
          ;(i.onerror = i.onload = null), clearTimeout(s)
          var n = r[e]
          if (0 !== n) {
            if (n) {
              var o = t && ('load' === t.type ? 'missing' : t.type),
                c = t && t.target && t.target.src
              ;(l.message = 'Loading chunk ' + e + ' failed.\n(' + o + ': ' + c + ')'),
                (l.name = 'ChunkLoadError'),
                (l.type = o),
                (l.request = c),
                n[1](l)
            }
            r[e] = void 0
          }
        }
        var s = setTimeout(function () {
          c({ type: 'timeout', target: i })
        }, 12e4)
        ;(i.onerror = i.onload = c), document.head.appendChild(i)
      }
    return Promise.all(t)
  }),
    (u.m = e),
    (u.c = o),
    (u.d = function (e, t, n) {
      u.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (u.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (u.t = function (e, t) {
      if ((1 & t && (e = u(e)), 8 & t)) return e
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e
      var n = Object.create(null)
      if (
        (u.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          u.d(
            n,
            o,
            function (t) {
              return e[t]
            }.bind(null, o)
          )
      return n
    }),
    (u.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e['default']
            }
          : function () {
              return e
            }
      return u.d(t, 'a', t), t
    }),
    (u.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (u.p = ''),
    (u.oe = function (e) {
      throw (console.error(e), e)
    })
  var i = (window['webpackJsonp'] = window['webpackJsonp'] || []),
    l = i.push.bind(i)
  ;(i.push = t), (i = i.slice())
  for (var s = 0; s < i.length; s++) t(i[s])
  var p = l
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
    var o = n('7a23'),
      r = { id: 'nav' },
      c = Object(o['createTextVNode'])('Home'),
      a = Object(o['createTextVNode'])(' | '),
      u = Object(o['createTextVNode'])('About')
    function i(e, t) {
      var n = Object(o['resolveComponent'])('router-link'),
        i = Object(o['resolveComponent'])('router-view')
      return (
        Object(o['openBlock'])(),
        Object(o['createElementBlock'])(
          o['Fragment'],
          null,
          [
            Object(o['createElementVNode'])('div', r, [
              Object(o['createVNode'])(
                n,
                { to: '/' },
                {
                  default: Object(o['withCtx'])(function () {
                    return [c]
                  }),
                  _: 1
                }
              ),
              a,
              Object(o['createVNode'])(
                n,
                { to: '/about' },
                {
                  default: Object(o['withCtx'])(function () {
                    return [u]
                  }),
                  _: 1
                }
              )
            ]),
            Object(o['createVNode'])(i)
          ],
          64
        )
      )
    }
    n('b684')
    var l = n('d959'),
      s = n.n(l)
    const p = {},
      f = s()(p, [['render', i]])
    var d = f,
      b = (n('d3b7'), n('3ca3'), n('ddb0'), n('6c02')),
      m = n('cf05'),
      v = n.n(m),
      h = { class: 'home' },
      g = Object(o['createElementVNode'])('img', { alt: 'Vue logo', src: v.a }, null, -1),
      j = [g]
    function O(e, t, n, r, c, a) {
      return Object(o['openBlock'])(), Object(o['createElementBlock'])('div', h, j)
    }
    var y = Object(o['defineComponent'])({ name: 'Home', components: {} })
    const w = s()(y, [['render', O]])
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
      k = Object(b['a'])({ history: Object(b['b'])(''), routes: P }),
      V = k,
      N = n('5502'),
      _ = Object(N['a'])({ state: {}, mutations: {}, actions: {}, modules: {} }),
      C = n('bc3a'),
      E = n.n(C)
    console.log('production')
    ;(E.a.defaults.baseURL = 'http://httpbin.org'),
      E.a.get('/get', { params: { id: 100, name: 'ds' } }).then(function (e) {
        console.log(e)
      }),
      E()({ method: 'post', url: '/post', data: { id: 1, name: 'dingshuai' } }).then(function (e) {
        console.log(e)
      }),
      E.a.interceptors.request.use(
        function (e) {
          return console.log(e), e
        },
        function (e) {
          return console.log(e), Promise.reject(e)
        }
      ),
      E.a.interceptors.response.use(
        function (e) {
          return console.log(e), e
        },
        function (e) {
          return console.log(e), Promise.reject(e)
        }
      )
    var T = n('b85c'),
      S = (n('b0c0'), n('7437'), n('b4bc')),
      A = n('c787'),
      B = n('934c'),
      M = n('60d4'),
      H = n('394a'),
      L = n('4eb1'),
      q = n('8a45'),
      J = n('d727'),
      F = n('e472'),
      R = [S['a'], A['a'], B['a'], M['a'], H['a'], L['a'], q['a'], J['a'], F['a']]
    function U(e) {
      var t,
        n = Object(T['a'])(R)
      try {
        for (n.s(); !(t = n.n()).done; ) {
          var o = t.value
          e.component(o.name, o)
        }
      } catch (r) {
        n.e(r)
      } finally {
        n.f()
      }
    }
    function z(e) {
      e.use(U)
    }
    var D = Object(o['createApp'])(d)
    D.use(z), D.use(_).use(V).mount('#app'), console.log('https://coderwhy.org/prod')
  },
  cf05: function (e, t, n) {
    e.exports = n.p + 'img/logo.82b9c7a5.png'
  }
})
//# sourceMappingURL=app.68b3e130.js.map
