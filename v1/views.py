from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response
from v1.models import Contact
from v1.serializers import ContactSerializer

class ContactList(views.APIView):
    def get(self, request):

        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactDetail(views.APIView):
    def get(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)

        serializer = ContactSerializer(contact)

        return Response(serializer.data)

    def delete(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        contact.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)

        serializer = ContactSerializer(contact, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)