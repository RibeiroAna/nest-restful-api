import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { MiddlewareFunction } from '@nestjs/common/interfaces/middleware/middleware.interface';

const securedRoutes = [
  { path: '/shopcart', method: 'POST' },
  { path: '/items', method: 'POST' },
];

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const isSecured = securedRoutes.filter((route) => {
        return route.path === req.baseUrl && route.method === req.method;
      }).length > 0;

      if (!isSecured) return next();

      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://${CLIENT_DOMAIN}/.well-known/jwks.json',
        }),

        audience: 'http://localhost:3000',
        issuer: 'https://${CLIENT_DOMAIN}/',
        algorithm: 'RS256',
      })(req, res, (err) => {
        if (err) {
          const status = err.status || 500;
          const message = err.message || 'Sorry, we were unable to process your request.';
          return res.status(status).send({
            message,
          });
        }
        next();
      });
    };
  }
}
