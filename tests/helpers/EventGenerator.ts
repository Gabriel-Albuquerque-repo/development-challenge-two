import { APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda';

type EventBody = {
    [name: string]: any;
};

export class EventGeneratorFromGatewayEvent {
    private event: APIGatewayProxyEventV2WithRequestContext<any> = {
        version: '2.0',
        routeKey: 'POST /create/volunteer',
        rawPath: '/create/volunteer',
        rawQueryString: '',
        headers: {
            accept: '*/*',
            'content-length': '',
            'content-type': 'application/json',
            host: '',
            'x-amzn-trace-id': '',
            'x-forwarded-for': '',
            'x-forwarded-port': '',
            'x-forwarded-proto': 'https',
        },
        requestContext: {
            accountId: '',
            apiId: '',
            domainName: '',
            domainPrefix: '',
            http: {
                method: 'POST',
                path: '/create/volunteer',
                protocol: 'HTTP/1.1',
                sourceIp: '',
                userAgent: '',
            },
            requestId: '',
            routeKey: '',
            stage: '',
            time: '',
            timeEpoch: 1645742348835,
        },
        body: '',
        isBase64Encoded: false,
    };

    constructor(body: EventBody) {
        this.event.body = JSON.stringify(body);
    }

    public get getFullEvent() {
        return this.event;
    }

    public set changeBody(body: { [email: string]: string }) {
        this.event.body = JSON.stringify(body);
    }
}
