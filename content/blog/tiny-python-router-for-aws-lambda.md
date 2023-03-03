+++
categories = ["TIL"]
date = 2022-01-21T05:00:00Z
description = "The utility of Python Flask routing on a Lambda, without the framework."
images = []
tags = ["AWS", "Python", "Serverless"]
title = "Tiny Python Router for AWS Lambda APIs"
toc = true

+++
I frequently run into the situation where I want the elegance of Python Flask routing on an AWS Lambda, but without the extra hassle of using the framework on a simple project. Golang has a mux built into the standard library, and [a whole host of stand-alone routers](https://github.com/avelino/awesome-go#routers), but so far I have not come across a good one for Python - so I made this. Is it the best possible? Definitely not. Does it meet my 80/20 use case? You betcha!

## Use if...

You want your Lambda code to read like a web framework, without adding heavy dependencies or setup of a real framework. It lets you:

* Set up simple path-based routing with very similar syntax to Flask.
* Add simple middleware for all your routes (Useful for simple logging, small modifications to `aws_event`).

That's it! Nothing fancy hiding here.

{{< giphy 7yojoQtevjOCI >}}

## Do not use if...

This is not right for every use case, especially:

* If you have path parameters you expect to be parsed for you and refuse to do yourself, or other complex features - [AWS Lambda Powertools](https://awslabs.github.io/aws-lambda-powertools-python/2.9.1/core/event_handler/api_gateway/#api-gateway-rest-api) may be a better pick for you.
* Don't want to maintain code.
* Really need a micro-framework like Flask and are avoiding the truth.

## Tiny Lambda Router

Diving in, the router is a simple class holding the mappings between method-path combos and the functions attached to them. Easy peasy.

### tiny_router.py

    class RouteNotFoundException(Exception):
        def __init__(self, msg: str) -> None:
            self.msg = msg
            super().__init__(self.msg)
    
    class TinyLambdaRouter:
        def __init__(self):
            self._path_funcs = {}
            self._middlewares = []
            self.aws_event = None
            self.aws_context = None
    
        def middleware(self):
            def decorator(f):
                self._add_middleware(f)
                return f
            return decorator
        
        def _add_middleware(self, func):
            self._middlewares.append(func)
        
        def route(self, path, **kwargs):
            def decorator(f):
                self._add_route(path, f, **kwargs)
                return f
            return decorator
    
        def _add_route(self, path, func, **kwargs):
            methods = kwargs.get('methods', ['GET'])
    
            for method in methods:
                search_key = f'{method}-{path}'
                if self._path_funcs.get(search_key):
                            raise ValueError(f'Path {search_key} already registered with function {self._path_funcs.get(search_key).__name__}')           
            
            for method in methods:
                search_key = f'{method}-{path}'
                self._path_funcs[search_key] = {'function': func, 'kwargs': kwargs}
    
            print(self._path_funcs)
    
        def run(self, aws_event, aws_context):
            self.aws_event = aws_event
            self.aws_context = aws_context
            # assumes using ALB or Api Gateway connected to Lambda
            path = aws_event['path']
            method = aws_event['httpMethod']
            search_key = f'{method}-{path}'
    
            try:
                print(self._path_funcs)
                path_func = self._path_funcs[search_key]['function']
                kwargs = self._path_funcs[search_key]['kwargs']
            except KeyError:
                raise RouteNotFoundException(f'No handler found for path:{search_key}')
    
            for m in self._middlewares:
                # TODO: could get creative like Express, Flask and make this more exciting
                m(self.aws_event)
    
            return path_func(aws_event, aws_context, kwargs)

### Example usage

An example, you say? Why of course! I too am tired of digging through repos with crappy docs and no examples.

1. Save the router in `tiny_router.py` and the example in `test_router.py`.
2. Run `python test_router.py`.
3. Thank the heavens you don't have to install Flask just for simple routing.

       import json
       import random
       
       from tiny_router import TinyLambdaRouter
       
       app = TinyLambdaRouter()
       
       @app.middleware()
       def logging_middleware(aws_event):
         print('In da middleware for the request')
         aws_event['middleware'] = f'added_from_middleware-{random.randint(1,100)}'
       
       @app.route('/implicit-health', extra_arg='an extra arg')
       def implicit_health(aws_event, aws_context, kwargs):
         kwargs['middleware'] = aws_event['middleware']
         return {
           'statusCode': 200,
           'body': json.dumps(kwargs)
         }
       
       @app.route('/health', extra_arg='an extra arg', methods=['GET'])
       def health(aws_event, aws_context, kwargs):
         kwargs['middleware'] = aws_event['middleware']
         return {
           'statusCode': 200,
           'body': json.dumps(kwargs)
         }
       
       def lambda_handler(event, context):
       return app.run(event, context)
       
       if __name__ == '__main__':
         events = [
           {'path': '/health', 'httpMethod': 'GET'},
           {'path': '/definitely/fake', 'httpMethod': 'GET'},
           {'path': '/health', 'httpMethod': 'PUT'},
           {'path': '/implicit-health', 'httpMethod': 'GET'}
         ]
         context = None
         for event in events:
           try:
           	print('Resp:', lambda_handler(event, context))
           except Exception as e:
             print(e)
             print('----------------------')

## Other options

If this doesn't fit your needs, there's other routes you can take:

* Handle parsing routes yourself (not recommended 😬)
* [AWS Lambda Powertools](https://awslabs.github.io/aws-lambda-powertools-python/2.9.1/core/event_handler/api_gateway/#api-gateway-rest-api), has lots of features, but seems well liked.
* [Lambda-router](https://pypi.org/project/lambda-router/) - not a bad option, but not my cup of tea.
* [Tiny-Router](https://github.com/nekonoshiri/tiny-router) - didn't exist when I made the first version a couple years ago, though I'm glad to see I'm not the only one that finds this pattern useful.
* Biting the bullet and using Flask - [Deploying a Flask app to AWS Lambda](https://dev.to/divporter/deploying-a-flask-app-to-aws-lambda-5em0).